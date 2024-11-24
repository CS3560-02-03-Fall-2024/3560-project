
// /db.ts fix later
import { createClient } from '@supabase/supabase-js';
import { EntityName, EntityTypes, TABLE_NAMES } from './index';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function createEntity<T extends EntityName>(
  entityName: T,
  data: Omit<EntityTypes[T], 'id' | 'created_at'>
) {
  const { data: result, error } = await supabase
    .from(TABLE_NAMES[entityName])
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result as EntityTypes[T];
}

export async function updateEntity<T extends EntityName>(
  entityName: T,
  id: number,
  data: Partial<Omit<EntityTypes[T], 'id' | 'created_at'>>
) {
  const { data: result, error } = await supabase
    .from(TABLE_NAMES[entityName])
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result as EntityTypes[T];
}

// same as index.ts concern, likely change attributes later
export async function getEntities<T extends EntityName>(
  entityName: T,
  options: {
    limit?: number;
    page?: number;
    isActive?: boolean;
    search?: string;
    filters?: Record<string, any>;
  }
) {
  const { limit = 10, page = 1, isActive, search, filters = {} } = options;
  const offset = (page - 1) * limit;

  let query = supabase
    .from(TABLE_NAMES[entityName])
    .select('*', { count: 'exact' });

  // Add isActive filter if provided
  if (isActive !== undefined) {
    query = query.eq('is_active', isActive);
  }

  // Add custom filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      query = query.eq(key, value);
    }
  });

  // Add search if provided
  if (search) {
    // Customize search fields based on entity type
    const searchFields = entityName === 'report' 
      ? ['title', 'description']
      : ['name', 'address'];
    
    const searchConditions = searchFields
      .map(field => `${field}.ilike.%${search}%`)
      .join(',');
    
    query = query.or(searchConditions);
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return {
    data,
    pagination: {
      total: count ?? 0,
      page,
      limit,
      pages: Math.ceil((count ?? 0) / limit)
    }
  };
}

// Example usage:
export async function getReports(options: {
    reportID: number;
    incidentID: number;
    details: string;
    submittedBy: number;
    is_active: boolean;
    timeStamp: string;
    severity?: 'low' | 'medium' | 'high';
}) {
  return getEntities('report', {
    ...options,
    filters: { severity: options.severity }
  });
}

export async function getCaller(options: {
  limit?: number;
  page?: number;
  isActive?: boolean;
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
}) {
  return getEntities('caller', {
    ...options,
    filters: { status: options.status }
  });
}

