"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserToken, setUserId } from "../../redux/features/userSlice";
import { setCarModel, setProviderId, setPickupDate, setReturnDate } from "../../redux/features/reservationSlice";
import getUserProfile from "../../libs/getUserProfile"; // Import the getUserProfile function

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  rentalPrice: number;
  available?: boolean;
}

interface Provider {
  _id: string;
  name: string;
  address: string;
  telephone: string;
}

export default function Reservations() {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state: RootState) => state.user);
  const { carModel, providerId, pickupDate, returnDate } = useSelector(
    (state: RootState) => state.reservation
  );

  const [carModels, setCarModels] = useState<string[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providerNames, setProviderNames] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      getUserProfile(token).then(profile => {
        dispatch(setUserId(profile._id)); // Set the user ID
      }).catch(err => {
        console.error("Error fetching user profile:", err);
      });
    }
    fetchCars();
    fetchProviders();
  }, [token, dispatch]);

  async function fetchCars() {
    try {
      const response = await fetch("http://localhost:5003/api/cars/search?available=true");
      const data: Car[] = await response.json();
      setCarModels([...new Set(data.map((car) => car.model))]);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  async function fetchProviders() {
    try {
      const response = await fetch("http://localhost:5003/api/users/providers");
      const data: Provider[] = await response.json();
      setProviders(data);
      setProviderNames([...new Set(data.map((provider) => provider.name))]);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "model") {
      dispatch(setCarModel(value));
    } else if (name === "provider") {
      const selectedProvider = providers.find(provider => provider.name === value);
      if (selectedProvider) dispatch(setProviderId(selectedProvider._id));
    } else if (name === "pickupDate") {
      dispatch(setPickupDate(value));
    } else if (name === "returnDate") {
      dispatch(setReturnDate(value));
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carModel,
          pickupDate,
          returnDate,
          providerId: providerId || "",
          userId: userId || "",
        }),
      });

      const result = await response.json();
      console.log("Booking Response:", result);
      if (!response.ok) {
        alert(result.message || "Failed to complete booking.");
      } else {
        alert("Booking completed successfully!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to complete booking. Try again.");
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>

      <div className="w-fit space-y-2">
        <div>
          <label className="block text-gray-600">Car Model</label>
          <select name="model" value={carModel} onChange={handleChange} className="px-4 py-2 border rounded">
            <option value="">All Models</option>
            {carModels.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Provider Name</label>
          <select name="provider" value={providerId || ""} onChange={handleChange} className="px-4 py-2 border rounded">
            <option value="">All Providers</option>
            {providerNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Pick-Up Date</label>
          <input className="border p-2 rounded" type="date" value={pickupDate} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-gray-600">Return Date</label>
          <input className="border p-2 rounded" type="date" value={returnDate} onChange={handleChange} />
        </div>
      </div>

      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow"
        onClick={handleBooking}
      >
        Check Car Availability & Book
      </button>
    </main>
  );
}
