let equipos = [];

async function init() {
    const { data, error } = await supabaseClient
        .from("equipos")
        .select("*");

    if (error) {
        console.error("Error cargando equipos:", error);
        return;
    }

    equipos = data;
    rellenarSelects();
}

function rellenarSelects() {
    const selectA = document.getElementById("equipoA");
    const selectB = document.getElementById("equipoB");

    selectA.innerHTML = "";
    selectB.innerHTML = "";

    equipos.forEach(e => {
        selectA.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
        selectB.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
    });
}

document.getElementById("form-resultados").addEventListener("submit", async function(e) {
    e.preventDefault();

    const idA = document.getElementById("equipoA").value;
    const idB = document.getElementById("equipoB").value;

    const tdA = parseInt(document.getElementById("tdA").value);
    const tdB = parseInt(document.getElementById("tdB").value);

    const heridosA = parseInt(document.getElementById("heridosA").value) || 0;
    const heridosB = parseInt(document.getElementById("heridosB").value) || 0;

    const expulsionesA = parseInt(document.getElementById("expulsionesA").value) || 0;
    const expulsionesB = parseInt(document.getElementById("expulsionesB").value) || 0;

    if (idA === idB) {
        alert("Equipos iguales ❌");
        return;
    }

    const A = equipos.find(e => e.id == idA);
    const B = equipos.find(e => e.id == idB);

    // 🏈 TOUCHDOWNS
    A.td_favor += tdA;
    A.td_contra += tdB;

    B.td_favor += tdB;
    B.td_contra += tdA;

    // 💀 HERIDOS
    A.heridos_favor += heridosA;
    A.heridos_contra += heridosB;

    B.heridos_favor += heridosB;
    B.heridos_contra += heridosA;

    // 🚫 EXPULSIONES
    A.expulsiones += expulsionesA;
    B.expulsiones += expulsionesB;

    // 🏆 RESULTADO
    if (tdA > tdB) {
        A.victorias++;
        B.derrotas++;
    } else if (tdA < tdB) {
        B.victorias++;
        A.derrotas++;
    } else {
        A.empates++;
        B.empates++;
    }

    // 💾 GUARDAR EQUIPOS (IMPORTANTE: usar supabaseClient)
    await supabaseClient.from("equipos").update(A).eq("id", A.id);
    await supabaseClient.from("equipos").update(B).eq("id", B.id);

    // 📜 GUARDAR PARTIDO
    await supabaseClient.from("partidos").insert({
        equipo_a: A.nombre,
        equipo_b: B.nombre,
        td_a: tdA,
        td_b: tdB,
        heridos_a: heridosA,
        heridos_b: heridosB,
        expulsiones_a: expulsionesA,
        expulsiones_b: expulsionesB,
        fecha: new Date().toLocaleString()
    });

    alert("Resultado guardado en la nube ☁️🔥");

    location.reload();
});

init();