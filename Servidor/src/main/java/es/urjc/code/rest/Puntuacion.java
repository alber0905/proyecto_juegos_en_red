package es.urjc.code.rest;

import java.util.Collections;
import java.util.List;

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
	
        public List<Puntuacion> meterPuntuacion(List<Puntuacion> listaPuntuaciones){
            int i = 0;
            while(i < listaPuntuaciones.size() && this.puntuacion < listaPuntuaciones.get(i).getPunt()){
                i++;
            }
            listaPuntuaciones.add(i, this);
            if(listaPuntuaciones.size()>10){
                listaPuntuaciones.remove(10);
            }
            return listaPuntuaciones;
        }
        
        
         
            
         
}
