import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import { useAuth } from '@/context/AuthContext';
import { loadEmergencias } from '@/api/cruds';

const ChartToPDF = () => {
  const chartRef = useRef(null);  // Referencia para el canvas
  const myChartRef = useRef(null); // Referencia para la instancia de Chart.js

  const [emergencias, setEmergencias] = useState([])
  const [loading, setLoading] = useState(true);

  const {token} = useAuth()

  const contarEmergenciasPorMesYTipo = (tipoEmergencia) => {
    // Inicializamos un arreglo para contar las emergencias por mes
    const conteoMensual = new Array(12).fill(0);
    
    
    // Iteramos sobre cada emergencia
    emergencias.forEach(emergencia => {
      // Verificamos si la emergencia es del tipo buscado
    
      if (emergencia.TipoEmergencia === tipoEmergencia) {
        // Obtenemos el índice del mes (0 para enero, 11 para diciembre)
        const mes = new Date(emergencia.FechaHoraReporte).getMonth();
        // Incrementamos el contador para ese mes
        conteoMensual[mes]++;
      }
      
    });
   
    return conteoMensual;
  }

  useEffect(()=>{
    const fetchEmergencias = async () => {
      try{
        const res = await loadEmergencias({headers: {'x-token': token}});
    
        setEmergencias(res.data)
        setLoading(false);
      }catch(err){
        console.log(err)
        setLoading(false);
      }
     
    }
  
    fetchEmergencias();

    return () => {
        // Limpiar la gráfica al desmontar el componente
        if (myChartRef.current) {
          myChartRef.current.destroy();
        }
      };
  },[])

  useEffect(() => {
    // Inicializar el gráfico al montar el componente
    if (!loading && emergencias) {
    const ctx = chartRef.current.getContext('2d');
    myChartRef.current = new Chart(ctx, {
      type: 'line', // Cambiamos el tipo de gráfico a 'line'
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Etiquetas del eje X
        datasets: [{
          label: 'Accidentes', // Etiqueta para la línea
          data: contarEmergenciasPorMesYTipo("Accidente"), // Datos para la gráfica de líneas
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo del área bajo la línea
          borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
          borderWidth: 2, // Grosor de la línea
          fill: true, // Rellenar el área bajo la línea
          tension: 0.1, // Suaviza la línea
        },
        {
            label: 'Incendios', // Etiqueta para la línea
            data: contarEmergenciasPorMesYTipo("Incendio"), // Datos para la gráfica de líneas
            backgroundColor: 'rgba(255, 128, 0, 0.2)', // Color de fondo del área bajo la línea
            borderColor: 'rgba(255, 128, 0, 1)', // Color de la línea
            borderWidth: 2, // Grosor de la línea
            fill: true, // Rellenar el área bajo la línea
            tension: 0.1, // Suaviza la línea
          },
          {
            label: 'Otros', // Etiqueta para la línea
            data: contarEmergenciasPorMesYTipo("Otro"), // Datos para la gráfica de líneas
            backgroundColor: 'rgba(255, 255, 0, 0.2)', // Color de fondo del área bajo la línea
            borderColor: 'rgba(255, 255, 0, 1)', // Color de la línea
            borderWidth: 2, // Grosor de la línea
            fill: true, // Rellenar el área bajo la línea
            tension: 0.1, // Suaviza la línea
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Asegura que el eje Y comience en cero
          }
        }
      }
    })};

    // Limpiar la gráfica al desmontar el componente
    return () => {
        if (myChartRef.current) {
          myChartRef.current.destroy();
        }
      };
  }, [loading, emergencias]);

  function contarPorMes(emergencias) {
    const contadorMeses = Array(12).fill(0); // Arreglo para contar los meses, desde enero (índice 0) a diciembre (índice 11)

    emergencias.forEach(emergencia => {
        const fecha = new Date(emergencia.FechaHoraReporte);
        const mes = fecha.getUTCMonth(); // Obtiene el mes (0 = enero, 11 = diciembre)
        contadorMeses[mes]++; // Incrementa el contador para ese mes
    });

    return contadorMeses;
}


  // Función para generar y descargar el PDF
  const downloadPdf = () => {
    const canvas = chartRef.current;
    const imgData = canvas.toDataURL('image/png'); // Obtener la imagen en Base64

    var porMes = contarPorMes(emergencias)

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 90); // Agregar imagen al PDF
    pdf.setFontSize(12); // Tamaño de la fuente
    pdf.setTextColor(0, 0, 0); // Color del texto en RGB
    pdf.text('Total de emegencias por mes', 10, 110); 
    pdf.text(`Enero: ${porMes[0]}`, 10, 120); 
    pdf.text(`Febreo: ${porMes[1]}`, 10, 130); 
    pdf.text(`Marzo: ${porMes[2]}`, 10, 140); 
    pdf.text(`Abril: ${porMes[3]}`, 10, 150); 
    pdf.text(`Mayo: ${porMes[4]}`, 10, 160); 
    pdf.text(`Junio: ${porMes[5]}`, 10, 170); 
    pdf.text(`Julio: ${porMes[6]}`, 10, 180); 
    pdf.text(`Agosto: ${porMes[7]}`, 10, 190); 
    pdf.text(`Septiembre: ${porMes[8]}`, 10, 200); 
    pdf.text(`Octubre: ${porMes[9]}`, 10, 210); 
    pdf.text(`Noviembre: ${porMes[10]}`, 10, 220); 
    pdf.text(`Diciembre: ${porMes[11]}`, 10, 230); 

    pdf.save('Reporte.pdf'); // Descargar el PDF
  };

  return (
    <div className='items-center'>
      <canvas ref={chartRef} width="400" height="200"></canvas>
      <button  className="md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600" onClick={downloadPdf}>Descargar reporte</button>
    </div>
  );
};

export default ChartToPDF;
