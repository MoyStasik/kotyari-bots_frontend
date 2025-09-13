export default () => {
  const viewport = useViewport();

  return {
    isDesktop: computed(() => viewport.isGreaterOrEquals("desktop")),
    isWide: computed(() => viewport.isGreaterOrEquals("tablet")),
    isTablet: computed(() => viewport.match("tablet")),
    isSmallTablet: computed(
      () =>
        viewport.isLessThan("tablet") && viewport.isGreaterThan("mobileMedium"),
    ),
    isMobile: computed(
      () =>
        viewport.isGreaterOrEquals("mobile") &&
        viewport.isLessOrEquals("mobileMedium"),
    ),
    isSmallMobile: computed(() => viewport.isLessOrEquals("mobile")),
  };
};
