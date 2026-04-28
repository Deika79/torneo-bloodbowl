async function cargarHistorial() {

    const { data, error } = await supabaseClient
        .from("partidos")
        .select("*")
        .order("id", { ascending: false });

    const tbody = document.querySelector("#tabla-historial tbody");
    tbody.innerHTML = "";

    data.forEach((p, i) => {
        const fila = `
            <tr>
                <td>${i + 1}</td>
                <td>${p.equipo_a}</td>
                <td>${p.td_a} - ${p.td_b}</td>
                <td>${p.equipo_b}</td>
                <td>${p.fecha}</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}

cargarHistorial();