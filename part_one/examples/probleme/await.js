function functieAsincrona() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("2 sec delay --> await");
        }, 2000);
    });
}


async function awaitRezultat() {
    try {
        const res = await functieAsincrona();
        console.log(res);
    } catch (err) {
        console.error("Error:", err);
    }
}

awaitRezultat();
