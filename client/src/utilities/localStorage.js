const getCart = () => {
    try {
        const cart = window.localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart from localStorage', error);
        return [];
    }
};

const setCart = (cart) => {
    try {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error setting cart to localStorage', error);
    }
};

const getWishlist = () => {
    try {
        const wishlist = window.localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
        console.error('Error getting wishlist from localStorage', error);
        return [];
    }
};

const setWishlist = (wishlist) => {
    try {
        window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
        console.error('Error setting wishlist to localStorage', error);
    }
};

const localStorage = {
    getCart,
    setCart,
    getWishlist,
    setWishlist
};
export default localStorage;