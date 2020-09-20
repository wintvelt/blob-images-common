// random key for secondary index
const PARTS = 15;

export const RND = () => {
    return 'RND' + Math.round(Math.random() * PARTS);
};