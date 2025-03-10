import {useState} from "react";
const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    const [updatedValue, setUpdatedValue] = useState(item.name || "");
    const [message, setMessage] = useState("");

    // 2. Create a function to handle the form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.example.com/items/${item.id}`, {
                method: "PUT", // Use PATCH if updating specific fields
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: updatedValue }),
            });

            if (!response.ok) {
                throw new Error("Failed to update item");
            }

            setMessage("Item updated successfully!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    // 3. Create a function to handle the form input changes
    const handleInputChange = (e) => {
        setUpdatedValue(e.target.value);
    };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={updatedValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateItem;
