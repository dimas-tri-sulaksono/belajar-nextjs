import { createSlice } from "@reduxjs/toolkit";

/** createSlice : fungsi untuk bikin slice dari reduce store yang berisi reducer dan action yang merupakan bagian dari state */
const screenSlice = createSlice({
  name: "screen", // nama slice

  // ini sama kayak const [data, ...] = useState(false)
  initialState: {
    isMobileScreen: false,
    isLargeScreen: false,
    username: "",
  },

  // reducer : object yang berisi kumpulan reducer yang akan dipake buat ngubah state slice
  reducers: {
    // setIsMobileScreen : nama reducer
    // sama kaya const [..., setData] = useState(action)
    setIsMobileScreen: (state, action) => {
      // untuk mengubah/memperbaharui nilai state isMobileScreen menjadi nilai uanh dikirim dari action.payload
      state.isMobileScreen = action.payload;
    },
    setIsLargeScreen: (state, action) => {
      state.isLargeScreen = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// export action creator yang bernama setIsMobileScreen dari slice untuk mengirim action ke store redux dan memicu perubahan state
export const { setIsMobileScreen, setIsLargeScreen, setUsername } =
  screenSlice.actions;

// export reducer biar bisa di simpan ke dalam store
export default screenSlice.reducer;
