"use client";

import { TweenMax } from "gsap";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function mathRandom(num = 8) {
  var numValue = -Math.random() * num + Math.random() * num;
  return numValue;
}

function setTintColor() {
  const setColor = 0x000000;
  return setColor;
}

const COLORS = {
  red: 0xf02050,
  rose: 0xff6347,
  yellow: 0xf2f111,
  purple: 0x540d6e,
  white: 0xffffff,
};

const HeroCanvas: React.FC = () => {
  const containerRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // VARIABLES
    var createCarPos = true;
    var uSpeed = 0.001;
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    // RANDOM BUILDING COLORS
    function createCity() {
      const segments = 2;
      let cubeWidth = 0.9;

      for (let i = 1; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(
          cubeWidth + mathRandom(1 - cubeWidth),
          0.1 + Math.abs(mathRandom(8)),
          cubeWidth + mathRandom(1 - cubeWidth),
          segments,
          segments,
          segments
        );
        const material = new THREE.MeshStandardMaterial({
          color: setTintColor(),
          wireframe: false,
          side: THREE.DoubleSide,
        });
        const wMaterial = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
          side: THREE.DoubleSide,
        });

        const cube = new THREE.Mesh(geometry, material);
        const wire = new THREE.Mesh(geometry, wMaterial);
        const floor = new THREE.Mesh(geometry, material);
        const wFloor = new THREE.Mesh(geometry, wMaterial);

        cube.add(wFloor);
        cube.castShadow = true;
        cube.receiveShadow = true;
        floor.scale.y = 0.05;

        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());

        floor.position.set(cube.position.x, 0, cube.position.z);

        town.add(floor);
        town.add(cube);
      }

      // PARTICLES
      const gMaterial = new THREE.MeshToonMaterial({
        color: COLORS.white,
        side: THREE.DoubleSide,
      });
      const gParticular = new THREE.CircleGeometry(0.02, 10);
      const aParticular = 5;

      for (let h = 1; h < 300; h++) {
        const particular = new THREE.Mesh(gParticular, gMaterial);
        particular.position.set(
          mathRandom(aParticular),
          mathRandom(aParticular),
          mathRandom(aParticular)
        );
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      const pMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        opacity: 0.9,
        transparent: true,
      });
      const pGeometry = new THREE.PlaneGeometry(60, 60);
      const pElement = new THREE.Mesh(pGeometry, pMaterial);
      pElement.rotation.x = (-90 * Math.PI) / 180;
      pElement.position.y = -0.001;
      pElement.receiveShadow = true;

      city.add(pElement);
    }

    // LINES WORLD
    var createCars = function (cScale = 2, cPos = 20, cColor = COLORS.white) {
      var cMat = new THREE.MeshToonMaterial({
        color: cColor,
        side: THREE.DoubleSide,
      });
      var cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      var cElem = new THREE.Mesh(cGeo, cMat);
      var cAmp = 3;

      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(cAmp);

        TweenMax.to(cElem.position, 3, {
          x: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
        });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(cAmp);
        cElem.position.z = -cPos;
        cElem.rotation.y = (90 * Math.PI) / 180;

        TweenMax.to(cElem.position, 5, {
          z: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
          // ease: Power1.easeInOut,
        });
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };

    var generateLines = function () {
      for (var i = 0; i < 60; i++) {
        createCars(0.1, 20);
      }
    };

    const initializeThree = async () => {
      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(COLORS.purple);
      scene.fog = new THREE.Fog(COLORS.purple, 10, 16);

      // Camera
      const fov = 25;
      const aspect =
        containerRef?.current?.offsetWidth /
        containerRef?.current?.offsetHeight;
      const near = 0.1; // the near clipping plane
      const far = 500; // the far clipping plane

      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 2, 16); // #OR we can use camera.position.z = 5;

      // LIGHTS
      const ambientLight = new THREE.AmbientLight(0xffffff, 4);
      const lightFront = new THREE.SpotLight(0xffffff, 20, 10);
      const lightBack = new THREE.PointLight(0xffffff, 0.5);

      lightFront.rotation.x = (45 * Math.PI) / 180;
      lightFront.rotation.z = (-45 * Math.PI) / 180;
      lightFront.position.set(5, 5, 5);
      lightFront.castShadow = true;
      lightFront.shadow.mapSize.width = 6000;
      lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
      lightFront.penumbra = 0.1;
      lightBack.position.set(0, 6, 0);
      smoke.position.y = 2;

      scene.add(ambientLight);
      city.add(lightFront);
      scene.add(lightBack);
      scene.add(city);
      city.add(smoke);
      city.add(town);

      // GRID HELPER
      const gridHelper = new THREE.GridHelper(60, 120, 0x000000, 0x000000);
      city.add(gridHelper);

      // Set up the renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias to smoothen out the edges
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio so that our scene will look good on HiDPI displays
      containerRef.current.appendChild(renderer.domElement);

      // Controls
      // controlsRef.current = new OrbitControls(camera, containerRef.current);

      // Resizing canvas on window resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      const axesHelper = new THREE.AxesHelper(1);
      scene.add(axesHelper);

      createCity();
      generateLines();

      var mouse = new THREE.Vector2();

      function onMouseMove(event: any) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
      function onDocumentTouchStart(event: any) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouse.x = event.touches[0].pageX - window.innerWidth / 2;
          mouse.y = event.touches[0].pageY - window.innerHeight / 2;
        }
      }
      function onDocumentTouchMove(event: any) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouse.x = event.touches[0].pageX - window.innerWidth / 2;
          mouse.y = event.touches[0].pageY - window.innerHeight / 2;
        }
      }
      window.addEventListener("mousemove", onMouseMove, false);
      window.addEventListener("touchstart", onDocumentTouchStart, false);
      window.addEventListener("touchmove", onDocumentTouchMove, false);

      const animate = function () {
        var time = Date.now() * 0.00005;
        requestAnimationFrame(animate);

        city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
        city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
        if (city.rotation.x < -0.05) city.rotation.x = -0.05;
        else if (city.rotation.x > 1) city.rotation.x = 1;
        var cityRotation = Math.sin(Date.now() / 5000) * 13;

        for (let i = 0, l = town.children.length; i < l; i++) {
          var object = town.children[i];
        }

        smoke.rotation.y += 0.01;
        smoke.rotation.x += 0.01;

        camera.lookAt(city.position);
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect =
          containerRef?.current?.offsetWidth /
          containerRef?.current?.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          containerRef?.current?.offsetWidth,
          containerRef?.current?.offsetHeight
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        renderer.dispose();
        controlsRef?.current?.dispose();
      };
    };

    initializeThree();
  }, []);

  return (
    <>
      <div className="absolute top-0 z-10 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background" />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
};

export default HeroCanvas;
