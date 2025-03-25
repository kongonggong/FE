"use client";

import React from "react";

interface Car {
    _id: string;
    make: string;
    model: string;
    year: number;
    rentalPrice: number;
    available?: boolean;
}

interface CarPanelProps {
    cars: Car[]; // ✅ Explicitly define 'cars' as a required prop
}

const CarPanel: React.FC<CarPanelProps> = ({ cars }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {cars.length === 0 ? (
                <p className="text-center text-gray-500">No cars found.</p>
            ) : (
                cars.map((car) => (
                    <div key={car._id} className="border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold">
                            {car.make} {car.model} ({car.year})
                        </h2>
                        <p className="text-gray-600">
                            Rental Price:{" "}
                            <span className="text-green-600 font-semibold">
                                {car.rentalPrice?.toLocaleString() || "N/A"} THB/day
                            </span>
                        </p>
                        <p className={car.available ? "text-green-500" : "text-red-500"}>
                            {car.available ? "Available" : "Booked"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CarPanel;
