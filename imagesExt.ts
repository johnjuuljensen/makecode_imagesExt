
//% blockNamespace=images
namespace imagesExt {

    export enum RotationType {
        ShearRotate = 0,
        ShearRotate2 = 1
    }

    export function shearOffset(gradient: number, j: number, size: number) {
        return (gradient * (j - (size >> 1)));
    }

    //% block="shearX $img by $gradient"
    //% group=Transformations
    //% img.shadow=screen_image_picker
    export function shearX(gradient: number, img: Image): Image {
        let res = image.create(img.width, img.height);
        for (let y = 0; y < img.height; ++y) { 
            const offset = Math.round(shearOffset(gradient, y+0.5, img.height));
            for (let x = 0; x < img.width; ++x) {
                res.setPixel(x + offset,y, img.getPixel(x,y));
            }
        }
        return res;
    }

    //% block="shearY $img by $gradient"
    //% group=Transformations
    //% img.shadow=screen_image_picker
    export function shearY(gradient: number, img: Image): Image {
        let res = image.create(img.width, img.height);
        for (let x = 0; x < img.width; ++x) {
            const offset = Math.round(shearOffset(gradient, x+0.5, img.width));
            for (let y = 0; y < img.height; ++y) { 
                res.setPixel(x ,y + offset, img.getPixel(x,y));
            }
        }
        return res;
    }

    //% block="$rotationType $img by $degrees degrees"
    //% group=Transformations
    //% img.shadow=screen_image_picker
    export function rotate(rotationType: RotationType, degrees: number, img: Image): Image {
        switch (rotationType) {
            case RotationType.ShearRotate: return shearRotate(degrees, img);
            case RotationType.ShearRotate2: return shearRotate2(degrees, img);
        }
    }

    // export function shearRotateCoord(degrees: number, x: number, y: number, w: number, h: number) {
    //     const rad = degrees * Math.PI / 180;
    //     const t = -Math.tan(rad / 2);
    //     const s = Math.sin(rad);
    //     console.log(`${t}, ${s}`)
    //     const ax = x + shearOffset(t, y+0.5, h);
    //     console.log(ax)
    //     const by = (y + shearOffset(s, ax+0.5, w));
    //     console.log(by)
    //     const cx = (ax + shearOffset(t, by+0.5, h));
    //     console.log(cx)
    //     console.log(`${x}, ${y} -> ${Math.round(cx)}, ${Math.round(by)}`)
    // }


    function shearRotate(degrees: number, img: Image): Image {
        /* rotation by shearing
        shear in X by -tan(angle/2)
        shear in Y by sin(angle)
        shear in X by -tan(angle/2)
        
        This function is an experiment in just applying the shearings
        on coordinate level instead of performing three actual shear
        operations.
        All attempts at performing the coordinated transforms with intermediate
        steps rounded to integer positions have resulted in offset errors.
        I suspect that the current implementation is pretty close to a regular
        sin/cos rotation with nearest neighbour. It's certainly possible for it
        to miss pixels, which the true shearing method shouldn't.
        */
        

        let res = image.create(img.width, img.height);

        // reverse angle because we're mapping backwards
        degrees = -degrees;
        // normalize angle to -180:180
        degrees = degrees - Math.floor((degrees + 180) / 360) * 360;
        if (degrees < -90 || 90 < degrees) {
            img = img.clone();
            img.flipX();
            img.flipY();

            degrees = degrees - 180;
        }

        const rad = degrees * Math.PI / 180;
        const t = -Math.tan(rad / 2);
        const s = Math.sin(rad);

        for (let x = 0; x < img.width; ++x) {
            for (let y = 0; y < img.height; ++y) { 
                const ax = x + shearOffset(t, y+0.5, img.height);
                const by = y + shearOffset(s, ax+0.5, img.width);
                const cx = ax + shearOffset(t, by+0.5, img.height);

                const fx = Math.round(cx);
                const fy = Math.round(by);
        
                res.setPixel(x, y, img.getPixel(fx, fy));
            }
        }
        return res;

    }


    // Same as above, but performs three actual shearing operations.
    function shearRotate2(degrees: number, img: Image): Image {
        degrees = degrees - Math.floor((degrees + 180) / 360) * 360;
        if (degrees < -90 || 90 < degrees) {
            img = img.clone();
            img.flipX();
            img.flipY();

            degrees = degrees - 180;
        } else if (degrees == -90) {
            return img.rotated(-90);
        } else if (degrees == 90) {
            return img.rotated(90);
        }

        const rad = degrees * Math.PI / 180;
        const t = -Math.tan(rad / 2);
        const s = Math.sin(rad);
        img = shearX(t, img);
        img = shearY(s, img);
        img = shearX(t, img);
        return img;
    }

    // export function imageRotated(img: Image, deg: number) {
    //     if (deg == -90 || deg == 270) {
    //         let r = img.transposed();
    //         r.flipY();
    //         return r;
    //     } else if (deg == 180 || deg == -180) {
    //         let r = img.clone();
    //         r.flipX();
    //         r.flipY();
    //         return r;
    //     } else if (deg == 90) {
    //         let r = img.transposed();
    //         r.flipX();
    //         return r;
    //     } else {
    //         return null;
    //     }
    // }
    
}