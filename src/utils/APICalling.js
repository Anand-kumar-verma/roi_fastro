import toast from "react-hot-toast";

export const logOutFunction = async () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};

export const price_statics = [
  {
    start1: "01 May 2025",
    end1: "26 May 2025",
    burning_event: "5",
    dollar: 1,
    token_cnt: 100,
  },
  {
    start1: "27 May 2025",
    end1: "10 June 2025",
    burning_event: "4",
    dollar: 1,
    token_cnt: 50,
  },
  {
    start1: "11 June 2025",
    end1: "24 June 2025",
    burning_event: "3",
    dollar: 1,
    token_cnt: 25,
  },
  {
    start1: "25 June 2025",
    end1: "07 July 2025",
    burning_event: "2",
    dollar: 1,
    token_cnt: 12,
  },
  {
    start1: "08 July 2025",
    end1: "19 July 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 6,
  },
  {
    start1: "20 July 2025",
    end1: "29 July 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 3,
  },
  {
    start1: "30 July 2025",
    end1: "07 Aug 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 1.5,
  },
  {
    start1: "08 Aug 2025",
    end1: "15 Aug 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.75,
  },
  {
    start1: "16 Aug 2025",
    end1: "23 Aug 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.37,
  },
  {
    start1: "24 Aug 2025",
    end1: "31 Aug 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.18,
  },
  {
    start1: "01 Sept 2025",
    end1: "08 Sept 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.09,
  },
  {
    start1: "09 Sept 2025",
    end1: "16 Sept 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.04,
  },
  {
    start1: "17 Sept 2025",
    end1: "24 Sept 2025",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.02,
  },
  {
    start1: "25 Sept 2025",
    end1: "Above",
    burning_event: "1",
    dollar: 1,
    token_cnt: 0.001,
  },
];
