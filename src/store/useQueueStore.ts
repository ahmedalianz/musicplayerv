export type QueueStore = {
  activeQueueId: string | null;
  setActiveQueueId: (queueId: string) => void;
};
export const createQueueSlice = (
  set: (fn: (state: QueueStore) => Partial<QueueStore>) => void
): QueueStore => ({
  activeQueueId: null,
  setActiveQueueId: (queueId: string) => set(() => ({activeQueueId: queueId})),
});
