async function cargarClasificacion() {

    const { data: equipos, error } = await supabaseClient
        .from("equipos")
        .select("*");

    if (error) {
        console.error("Error cargando equipos:", error);
        return;
    }

    // calcular puntos
    equipos.forEach(e => {
        e.puntos = (e.victorias * 3) + (e.empates * 1);
    });

    // ordenar
    equipos.sort((a, b) => b.puntos - a.puntos);

    const tbody = document.querySelector("#tabla-clasificacion tbody");
    tbody.innerHTML = "";

    equipos.forEach((equipo, index) => {
        const fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${equipo.nombre}</td>
                <td>${equipo.puntos}</td>
                <td>${equipo.victorias}</td>
                <td>${equipo.empates}</td>
                <td>${equipo.derrotas}</td>
                <td>${equipo.td_favor}</td>
                <td>${equipo.td_contra}</td>
                <td>${equipo.heridos_favor}</td>
                <td>${equipo.heridos_contra}</td>
                <td>${equipo.expulsiones}</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}

cargarClasificacion();