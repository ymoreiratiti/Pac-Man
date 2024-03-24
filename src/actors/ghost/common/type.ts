export enum GhostState {
  WAITING = "WAITING", //  Waiting inside the Ghost House
  CHASING = "CHASING", //  Chasing Pacman
  SCATTER = "SCATTER", //  Scattering to a corner
  FRIGHTENED = "FRIGHTENED", //  Running away from Pacman
  SPAWN = "SPAWN", //  Run to Ghost House for Spawn
}
