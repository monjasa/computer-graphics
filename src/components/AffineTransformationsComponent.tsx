import React from "react";
import { Layer, Stage} from "react-konva";

interface AffineProps {

}

const AffineTransformationsComponent: React.FC<AffineProps> = (props: AffineProps) => {

  return (
    <div>
      <Stage className="my-4" width={window.innerWidth} height={window.innerHeight}>
        <Layer>

        </Layer>
      </Stage>
    </div>
  );
};

export default AffineTransformationsComponent;