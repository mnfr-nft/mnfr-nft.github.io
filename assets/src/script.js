setTimeout(function () {
    $('#load').fadeOut(2000, function () {
        $('#website').fadeIn(1000).css("display", "flex");
    });
}, 1000);




addEventListener('DOMContentLoaded', () => {
    fetch('./assets/src/data.json')
        .then(Response => Response.json())
        .then(file => {

            let currentPage = 1;

            const currentDate = new Date();

            const eachPage = 5;

            const items = [];

            const projects = document.getElementById("data");

            const asd = document.getElementById("data");


            Object.entries(file).forEach(([chain, data]) => {

                Object.entries(data).forEach(([title, metadata]) => {

                    const release = new Date(metadata.date);

                    const offset = new Date(release);
                    offset.setDate(release.getDate() + 1);

                    if (offset > currentDate) {

                        const nft = {
                            title,
                            chain,
                            metadata
                        };

                        items.push(nft);

                    }

                });

            });

            const totalPages = Math.ceil(items.length / eachPage);


            document.getElementById("count").textContent = "Projects: " + items.length;


            // Handle 'Next' button click
            document.getElementById("next").addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(currentPage); // Render the next page
                                    
                }
            });

            // Handle 'Previous' button click
            document.getElementById("prev").addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(currentPage); // Render the previous page
                }
            });


            function renderPage(page) {

                document.getElementById("nums").textContent = currentPage + " / " + totalPages;

                projects.innerHTML = ``;

                const start = (page - 1) * eachPage;
                const end = start + eachPage;

                const sorted = items.slice().sort((a,b) => {
                    const alpha = new Date(a.metadata.date);
                    const beta = new Date(b.metadata.date);

                    return alpha - beta;
                });

                const objects = sorted.slice(start, end);

                objects.forEach((id, index) => {

                    const obj = document.createElement("a");

                    obj.setAttribute("href", id.metadata.link);

                    if (isSameDay(new Date(id.metadata.date), currentDate)) {

                        obj.classList.add("today"); 

                    } else if (new Date(id.metadata.date) < currentDate) {

                        obj.classList.add("old-one");
                    }

                    function isSameDay(date1, date2) {
                        return date1.getFullYear() === date2.getFullYear() &&
                            date1.getMonth() === date2.getMonth() &&
                            date1.getDate() === date2.getDate();
                    }


                    obj.classList.add("nft", "box");

                    obj.innerHTML = `

                                <article>
                                    <img src="./assets/img/collection/${id.title}.png">
                                    <h4>
                                        ${id.metadata.name}
                                    </h4>
                                    <ul>
                                        <span> ${id.chain} </span>
                                        <span> ${id.metadata.supply} </span>
                                         ${id.metadata.early ? "<span>og</span>" : ""} 
                                    </ul>
                                </article>
                                <div>
                                    <span> ${id.metadata.date} </span>
                                    <span> ${id.metadata.list} </span>
                                </div>

                            `;

                    projects.appendChild(obj);

                });
            }

            renderPage(currentPage);

        }
        )
}
);