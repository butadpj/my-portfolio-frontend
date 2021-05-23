const useGetRandomItem = (array) => {
  let item = array[Math.floor(Math.random() * array.length)];
  return item;
};

export default useGetRandomItem;
