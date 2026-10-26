import { UIElement } from "ziko/dom";

export declare class UISkeleton extends UIElement {}

export type SkeletonVariants = | 'text'
                               | 'circular'
                               | 'rectangular'
                               | 'rounded'
export type SkeletonAnimations = | 'pulse'
                                 | 'wave'
                                 | false

export declare const Skeleton: (props : {
    variant?: SkeletonVariants,
    animation? : SkeletonAnimations
}) => UISkeleton;

