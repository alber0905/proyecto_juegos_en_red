package es.urjc.code.rest;

public class Puntuacion {
	
	private int puntuacion;
	private String nombre;
	
	public Puntuacion() {
	}
	
	public Puntuacion(int puntuacion, String nombre) {
		this.puntuacion = puntuacion;
		this.nombre = nombre;
	}

	public String getName() {
		return nombre;
	}

	public void setName(String name) {
		this.nombre = name;
	}

	public int getPunt() {
		return puntuacion;
	}

	public void setPunt(int punt) {
		this.puntuacion = punt;
	}
	
}
