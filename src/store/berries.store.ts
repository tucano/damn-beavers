import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  inc: () => void;
  reset: () => void;
};

const initialState: State = {
  count: 0,
};

export const useBerriesStore = create<State & Actions>()(set => ({
  ...initialState,
  inc: () => set(state => ({ count: state.count + 1 })),
  reset: () => set(initialState),
}));
