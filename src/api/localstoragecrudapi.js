import { toast } from "react-toastify";

export const localstoragecrudapi = {
    setBook: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.error(err);
        }
    },
    getBooks: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(err)
        }
    },
    removeBook: (row, booksData) => {
        try {
            const newUpdatedBookData = booksData.filter(bookData => bookData.id !== row.id);
            return localstoragecrudapi.setBook('libraryAppData', JSON.stringify(newUpdatedBookData));
        } catch (error) {
            console.error(error);
        }
    },
}