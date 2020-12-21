import {Stage, Layer, Image} from 'react-konva';
import Konva from 'konva';
import React, {MutableRefObject, useEffect} from "react";
import useImage from "use-image";
import {getPixelRGBA} from 'react-native-get-pixel';

interface ColorSchemeProps {
    width: number,
    height: number,
}

let imgWidth = 500;
let imgHeight = 500;
const URL = './mountains.jpg';

const LoadImage = () => {

    const [image] = useImage(URL);
    const imageRef = React.useRef() as MutableRefObject<any>;

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
            imageRef.current.getLayer().batchDraw();
        }
    }, [image]);

    const getPixelInfo = () => {
        let x = imageRef.current.getStage().getPointerPosition().x;
        let y = imageRef.current.getStage().getPointerPosition().y;

        console.log(`${x} ${y}`);

        imageRef.current.getImageData();

        /*getPixelRGBA(URL, x, y)
            .then(color => console.log(color)) // [243, 123, 0]
            .catch(err => {});*/
    }

    return (
        <Image
            ref={imageRef}
            x={0}
            y={0}
            image={image}
            width={imgWidth}
            height={imgHeight}
            onClick={getPixelInfo}
        />
    );
};

export const ColorSchemeComponent: React.FC<ColorSchemeProps> = (props: ColorSchemeProps) => {

    imgHeight = props.height;
    imgWidth = props.width;

    return (
        <Stage width={props.width} height={props.height}>
            <Layer>
                <LoadImage/>
            </Layer>
        </Stage>
    )
}