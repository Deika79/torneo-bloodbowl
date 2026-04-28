async function cargarEquipos() {

    const { data, error } = await supabaseClient
        .from("equipos")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const container = document.getElementById("equipos-container");
    container.innerHTML = "";

    data.forEach(equipo => {

        const card = `
            <div class="equipo-card">
                <img src="assets/img/equipos/${equipo.slug}.jpg" alt="${equipo.nombre}">
                <h3>
                    <a href="equipos/${equipo.slug}.html">${equipo.nombre}</a>
                </h3>
            </div>
        `;

        container.innerHTML += card;
    });
}

cargarEquipos();