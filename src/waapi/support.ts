import type { ValidScrollAxis } from '../types';
import { ScrollAxis } from '../types';

/** Browser constructor for `ScrollTimeline` (scroll offset progress). */
export type ScrollTimelineCtor = new (
  options?: ScrollTimelineOptions
) => AnimationTimeline;

/** Browser constructor for `ViewTimeline` (subject visibility in scrollport). */
export type ViewTimelineCtor = new (
  options: ViewTimelineOptions
) => AnimationTimeline;

type ScrollTimelineOptions = {
  source?: globalThis.Element | Document | null;
  axis?: string;
  scrollOffsets?: unknown[];
};

type ViewTimelineOptions = {
  subject: globalThis.Element;
  axis?: string;
};

/** Resolve `ScrollTimeline` without assuming it exists on `globalThis` (SSR / old browsers). */
export function getScrollTimelineCtor(): ScrollTimelineCtor | undefined {
  return (globalThis as unknown as { ScrollTimeline?: ScrollTimelineCtor })
    .ScrollTimeline;
}

export function getViewTimelineCtor(): ViewTimelineCtor | undefined {
  return (globalThis as unknown as { ViewTimeline?: ViewTimelineCtor })
    .ViewTimeline;
}

/** Browser constructor for `GroupEffect` (layered keyframe composition). */
export type GroupEffectCtor = new (children: KeyframeEffect[]) => AnimationEffect;

/** `Animation` constructor accepting scroll-driven options as the second argument. */
export type ComposedAnimationCtor = new (
  effect: AnimationEffect,
  options?: KeyframeAnimationOptions
) => Animation;

export function getGroupEffectCtor(): GroupEffectCtor | undefined {
  return (globalThis as unknown as { GroupEffect?: GroupEffectCtor })
    .GroupEffect;
}

export function getComposedAnimationCtor(): ComposedAnimationCtor | undefined {
  return (globalThis as unknown as { Animation?: ComposedAnimationCtor })
    .Animation;
}

/** True when the browser can run scroll-linked WAAPI (`ViewTimeline` + `ScrollTimeline` + `animate`). */
export function supportsScrollDrivenAnimations(): boolean {
  return (
    typeof getScrollTimelineCtor() === 'function' &&
    typeof getViewTimelineCtor() === 'function' &&
    typeof HTMLElement.prototype.animate === 'function'
  );
}

/** WAAPI timeline `axis`: vertical scroll uses `y`, horizontal uses `x` (physical axes, not writing-mode-relative). */
export function timelineAxis(scrollAxis: ValidScrollAxis): string {
  return scrollAxis === ScrollAxis.horizontal ? 'x' : 'y';
}
