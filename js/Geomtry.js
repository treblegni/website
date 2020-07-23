class PointOfViewGeometry {
    constructor(id,element) {
        const {clientHeight,clientWidth} = element;
        
        this.element = element;
        this.pointerX;
        this.pointerY;
        this.scene = new THREE.Scene();
        //@params: fov,aspect ratio,near number, far number
        this.camera = new THREE.PerspectiveCamera(30,clientWidth/clientHeight,1,1000)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(clientWidth,clientHeight);
        this.particles;
        this.renderingParent;
        this.resizeContainer;
        this.tween;

        this.element.appendChild(this.renderer.domElement);

        this.onMouseMoveListener();
        this.onElementResizeListener();
    }

    onMouseMoveListener = () => {
        document.addEventListener('mousemove',onMouseMove,false);
    }

    onElementResizeListener = () => {
        window.addEventListener('resize', () => {
            const { clientWidth,clientHeight } = this.element
            this.camera.aspect = clientWidth/clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(clientWidth,clientHeight);
        })
    }

    renderGeometry = () => {
        const 
            distance = Math.min(200, window.innerWidth / 4),
            geometry = new THREE.Geometry();

        for (let i = 0; i < 1600; i++) {
            const 
                vertex = new THREE.Vector3(),
                theta = THREE.Math.randFloatSpread(360),
                phi = THREE.Math.randFloatSpread(360); 

            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }

        this.particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff44ff, size: 2}));
        particles.boundingSphere = 50;

        this.renderingParent = new THREE.Group();  
        renderingParent.add(particles);

        this.resizeContainer = new THREE.Group();
        resizeContainer.add(renderingParent);

        this.scene.add(resizeContainer);

        this.camera.position.z = 400;

        // Scaling animation
        const animProps = {scale: 1, xRot: 0, yRot: 0};
        gsap.to(animProps, {
            duration: 10, 
            scale: 1.3, 
            repeat: -1, 
            yoyo: true, 
            ease: "sine", 
            onUpdate: () => {
                renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale);
            }
        });

        gsap.to(animProps, {
            duration: 120, 
            xRot: Math.PI * 2, 
            yRot: Math.PI * 4, 
            repeat: -1, yoyo: true, 
            ease: "none", 
            onUpdate: () => {
                renderingParent.rotation.set(animProps.xRot,animProps.yRot,0);
            }
        });
    }

    onMouseMove = event => {
        if (this.tween) this.tween.kill();

        const {clientWidth,clientHeight} = this.element;

        this.pointerX = ( event.clientX/clientWidth ) * 2 - 1;
        this.pointerY = - ( event.clientY/clientHeight ) * 2 + 1;

        this.tween = gsap.to(this.particles.rotation, {duration: 0.1, x: this.pointerY*-1, y: this.pointerX});
        //particles.rotation.x = mouseY*-1;
        //particles.rotation.y = mouseX;
    }

    animate = () => {
        requestAnimationFrame( animate );
        this.renderer.render( this.scene, this.camera );
    }
}

export default PointOfViewGeometry;