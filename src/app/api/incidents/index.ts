// /types/index.ts
export interface Report {
    reportID: number;
    incidentID: number;
    details: string;
    submittedBy: number;
    is_active: boolean;
    timeStamp: string;
    severity?: 'low' | 'medium' | 'high';
  }
  
  export interface Caller {
    callerID: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    status: 'active' | 'inactive' | 'pending';
  }
  
  // Map of entity names to their table names
  export const TABLE_NAMES = {
    report: 'reports',
    caller: 'caller'
  } as const;
  
  // Type for valid entity names
  export type EntityName = keyof typeof TABLE_NAMES;
  
  // Type mapping for entities
  export type EntityTypes = {
    report: Report;
    caller: Caller;
  }
  

  // Then in your database function, constrain T to be EntityName
  //currently not sure what the function of this is beyond making T work, likely change the attributes later
  //also, this function might not even be used currently
  /*
export async function getEntities<T extends EntityName>(
    entityName: T,
    options: {
      limit?: number;
      page?: number;
      isActive?: boolean;
      search?: string;
      filters?: Record<string, any>;
    }
  ): Promise<{
    data: EntityTypes[T][];  // This is now properly typed
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
}> {
    const { limit = 10, page = 1, isActive, search, filters = {} } = options;
    const offset = (page - 1) * limit;
  
    let query = supabase
      .from(TABLES[entityName])
      .select('*', { count: 'exact' });
  
    if (isActive !== undefined) {
      query = query.eq('is_active', isActive);
    }
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query = query.eq(key, value);
      }
    });
  
    if (search) {
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
      data: data as EntityTypes[T][],
      pagination: {
        total: count ?? 0,
        page,
        limit,
        pages: Math.ceil((count ?? 0) / limit)
      }
    };
}
    */
