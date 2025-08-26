import type { Particle } from "./particle";
import type { ThinParticleSystem } from "./thinParticleSystem";
/** Color */
/** @internal */
export declare function _CreateColorData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateColorGradientsData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessColorGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessColor(particle: Particle, system: ThinParticleSystem): void;
/** Angular speed */
/** @internal */
export declare function _ProcessAngularSpeedGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessAngularSpeed(particle: Particle, system: ThinParticleSystem): void;
/** Velocity & direction */
/** @internal */
export declare function _CreateDirectionData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateCustomDirectionData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateVelocityGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateLimitVelocityGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessVelocityGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessLimitVelocityGradients(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessDirection(particle: Particle, system: ThinParticleSystem): void;
/** Position */
/** @internal */
export declare function _CreatePositionData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateCustomPositionData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateIsLocalData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessPosition(particle: Particle, system: ThinParticleSystem): void;
/** Drag */
/** @internal */
export declare function _CreateDragData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessDragGradients(particle: Particle, system: ThinParticleSystem): void;
/** Noise */
/** @internal */
export declare function _CreateNoiseData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessNoise(particle: Particle, system: ThinParticleSystem): void;
/** Gravity */
/** @internal */
export declare function _ProcessGravity(particle: Particle, system: ThinParticleSystem): void;
/** Size */
/** @internal */
export declare function _CreateSizeData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateSizeGradientsData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateStartSizeGradientsData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _ProcessSizeGradients(particle: Particle, system: ThinParticleSystem): void;
/** Ramp */
/** @internal */
export declare function _CreateRampData(particle: Particle, system: ThinParticleSystem): void;
/** Remap */
/** @internal */
export declare function _ProcessRemapGradients(particle: Particle, system: ThinParticleSystem): void;
/** Life */
/** @internal */
export declare function _CreateLifeGradientsData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateLifetimeData(particle: Particle, system: ThinParticleSystem): void;
/** Emit power */
/** @internal */
export declare function _CreateEmitPowerData(particle: Particle, system: ThinParticleSystem): void;
/** Angle */
/** @internal */
export declare function _CreateAngleData(particle: Particle, system: ThinParticleSystem): void;
/** @internal */
export declare function _CreateAngleGradientsData(particle: Particle, system: ThinParticleSystem): void;
/** Sheet */
/** @internal */
export declare function _CreateSheetData(particle: Particle, system: ThinParticleSystem): void;
