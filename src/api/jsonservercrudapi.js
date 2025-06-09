import { toast } from "react-toastify";

const BASE_URL = 'http://localhost:7575'; // Use http, not https

export const jsonservercrudapi = {
    getBooks: async (resource) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}`, { method: "GET" });
            if (!response.ok) {
                toast.error('Error fetching books (GET BOOKS REQUEST)');
                return [];
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            toast.error('Error fetching books (GET BOOKS REQUEST)');
            return [];
        }
    },
    setBooks: async (resource, value) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if (!response.ok) {
                toast.error('Error storing books (SET BOOKS REQUEST)');
                return null;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            toast.error('Error storing books (SET BOOKS REQUEST)');
            return null;
        }
    },
    removeBook: async (resource, id) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                toast.error('Error deleting book');
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            toast.error('Error deleting book');
            return false;
        }
    },
    updateBook: async (resource, id, value) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if (!response.ok) {
                toast.error('Error updating book');
                return null;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            toast.error('Error updating book');
            return null;
        }
    }
};