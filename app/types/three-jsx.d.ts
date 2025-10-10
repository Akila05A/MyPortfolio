import { MeshPhongMaterialParameters } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      sphereGeometry: any;
      meshPhongMaterial: MeshPhongMaterialParameters & {
        attach?: string;
        wireframe?: boolean;
      };
    }
  }
} 