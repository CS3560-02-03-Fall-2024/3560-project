"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

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
          latitude: lat,
          longitude: long,
          phone,
          description,
          eventType: type,
        }),
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        setIsOpen(false);
        // Optionally reset the form fields
        setLat("");
        setLong("");
        setPhone("");
        setDescription("");
        setType("");
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
                <div className="flex flex-row gap-x-4">
                  <Input
                    onChange={(e) => setLat(e.target.value)}
                    label="Latitude"
                  />
                  <Input
                    onChange={(e) => setLong(e.target.value)}
                    label="Longitude"
                  />
                </div>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone"
                  label="Phone Number"
                />
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  label="Brief Description"
                />
                <Select
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Select type..."
                  label="Event Type"
                  options={["Welfare Check", "Home Invasion"]}
                />
                <Button label="Submit Report" />
              </div>
            </Card>
          </div>
        </div>
      </>
    )
  );
}
