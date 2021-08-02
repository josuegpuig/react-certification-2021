import { renderHook } from '@testing-library/react-hooks';
import { useGetVideo } from './VideoDetails';
import video from '../../utils/video-mock.json';

describe('Video hook testing', () => {
  describe('Use Get Video', () => {
    beforeAll(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ ...video }),
        })
      );
    });

    it('should get searched video', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetVideo('TEST_ID'));
      await waitForNextUpdate();
      expect(result.current.video).toStrictEqual(video);
    });
  });
});
