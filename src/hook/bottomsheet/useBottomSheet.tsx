import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { ReactNode, useMemo, useRef, useState } from 'react';

import { useTheme } from '~/context/ThemeProvider';
import { SetBottomSheetContent } from '~/type/bottomSheet';

const defaultSnapPoints = [240];

function useBottomSheet({
  snapPoints = defaultSnapPoints,
}: {
  snapPoints?: number[];
} = {}) {
  const { t } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetContent, _setBottomSheetContent] =
    useState<ReactNode>(null);

  return useMemo(() => {
    const closeBottomSheet = () => {
      bottomSheetRef.current?.close();
    };

    const expandBottomSheet = () => {
      bottomSheetRef.current?.expand();
    };

    const setBottomSheetContent: SetBottomSheetContent = ({ content }) => {
      _setBottomSheetContent(content);

      if (content) {
        expandBottomSheet();
      } else {
        closeBottomSheet();
      }
    };

    return {
      setBottomSheetContent,
      closeBottomSheet,
      expandBottomSheet,
      bottomSheet: (
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={[t.bgBottomSheet]}
          enablePanDownToClose
          backdropComponent={(props) => {
            return (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                onPress={() => {
                  bottomSheetRef.current?.close();
                }}
              />
            );
          }}
          onClose={() => {
            setBottomSheetContent({ content: null });
          }}
        >
          {bottomSheetContent}
        </BottomSheet>
      ),
    };
  }, [bottomSheetContent, snapPoints, t]);
}

export { useBottomSheet };
