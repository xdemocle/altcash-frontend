const useRound = () => {
  const getRound = (val: number, num: number) => {
    return Math.round(val / num) * num;
  };

  return {
    getRound
  };
};

export default useRound;
