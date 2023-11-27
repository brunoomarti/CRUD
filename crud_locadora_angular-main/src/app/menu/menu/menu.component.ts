import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../shared/global-css.scss']
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: false }) rendererContainer?: ElementRef<HTMLDivElement>;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  stars!: THREE.Points;
  starGeometry!: THREE.BufferGeometry;
  starPositions!: Float32Array;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.rendererContainer) {
      this.init();
    }
  }

  init(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = Math.PI / 2;

    this.renderer = new THREE.WebGLRenderer({ alpha: true }); // Configura o fundo como transparente
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.rendererContainer) {
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    }

    const positions = [];
    for (let i = 0; i < 6000; i++) {
      positions.push(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
    }
    this.starPositions = new Float32Array(positions);

    this.starGeometry = new THREE.BufferGeometry();
    this.starGeometry.setAttribute('position', new THREE.BufferAttribute(this.starPositions, 3));

    const sprite = new THREE.TextureLoader().load('../../../assets/star.png');
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
      transparent: true // Torna o material transparente
    });

    this.stars = new THREE.Points(this.starGeometry, starMaterial);
    if (this.scene) {
      this.scene.add(this.stars);
    }

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.animate();
  }

  animate(): void {
    for (let i = 0; i < this.starPositions.length; i += 3) {
      this.starPositions[i + 1] -= Math.random() * 0.5;

      if (this.starPositions[i + 1] < -200) {
        this.starPositions[i + 1] = 200;
      }
    }

    this.starGeometry.getAttribute('position').needsUpdate = true;
    this.stars.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
