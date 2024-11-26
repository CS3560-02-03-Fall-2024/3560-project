"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  const [address, setAddress] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const queryClient = useQueryClient();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // @ts-ignore Not implemented in ts yet apparentlyt
    if (!event.target.closest("#modal")) {
      setIsOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personnel_ID: personnelId,
          address,
          priority,
          description,
          phone,
          firstName,
          lastName,
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        queryClient.invalidateQueries();
        // Optionally reset the form fields
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to submit the report."}`);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    isOpen && (
      <>
        <div
          className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50"
          onClick={handleClick}
        >
          <div className="bg-white rounded-xl">
            <Card title="Submit a Report">
              <div
                className="flex flex-col gap-y-[22px] pointer-events-auto"
                id="modal"
              >
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  label="Address"
                />
                <Input
                  onChange={(e) => setFirstName(e.target.value)}
                  label="First Name"
                />

                <Input
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
                />

                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone Number"
                  type="phone"
                />
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  label="Brief Description"
                />
                <Select
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Select priority..."
                  label="Priority"
                  options={["Low", "Medium", "High"]}
                />
                <Input
                  type="text"
                  label="Assigned Personnel Id"
                  onChange={(e) => setPersonnelId(e.target.value)}
                />
                <Button label="Submit Report" onClick={handleSubmit} />
              </div>
            </Card>
          </div>
        </div>
      </>
    )
  );
}
