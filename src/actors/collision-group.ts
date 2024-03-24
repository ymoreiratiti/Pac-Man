import { CollisionGroup, CollisionGroupManager } from "excalibur";

export const PlayerCollisionGroup = CollisionGroupManager.create("PlayerActor");
export const GhostActorCollisionGroup = CollisionGroupManager.create("GhostActor");
export const DotCollisionGroup = CollisionGroupManager.create("Dot");
export const SpecialDotCollisionGroup = CollisionGroupManager.create("SpecialDot");

export const ghostCanCollideWith = CollisionGroup.collidesWith([
  // PlayerCollisionGroup
]);
