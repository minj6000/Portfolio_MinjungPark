const projects = {
    cover: ['Pages/cover_portfolio.png', 'Pages/Intro.png'],
    project1: ['Pages/Ambiband_1.png', 'Pages/Ambiband_2.png', 'Pages/Ambiband_3.png'],
    project2: ['Pages/Talsoom_1.png', 'Pages/Talsoom_2.png', 'Pages/Talsoom_3.png'],
    project3: ['Pages/Artronaut_1.png', 'Pages/Artronaut_2.png', 'Pages/Artronaut_3.png'],
    project4: ['Pages/6Sentences_1.png', 'Pages/6Sentences_2.png', 'Pages/6Sentences_3.png'],
    project5: ['Pages/MMP_1.png', 'Pages/MMP_2.png', 'Pages/MMP_3.png'],
    project6: ['Pages/WYWH_1.png', 'Pages/WYWH_2.png', 'Pages/WYWH_3.png'],    
    overview: ['Pages/Lastpage.png']
};

let currentProject = 'cover'; 
let currentIndex = 0;

function updateButtonStates() {
    const buttons = document.querySelectorAll('#projectbuttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
        const project = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (project === currentProject) {
            button.classList.add('active');
        }
    });
}
function updateImageDisplay() {
    const imgPath = projects[currentProject][currentIndex];
    document.getElementById('main-image').src = imgPath;
    updateButtonStates(); 
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentProject = getPreviousProject(currentProject);
        currentIndex = projects[currentProject].length - 1; 
    }
    updateImageDisplay();
});

function getPreviousProject(current) {
    const projectKeys = Object.keys(projects);
    const currentIdx = projectKeys.indexOf(current);
    return currentIdx > 0 ? projectKeys[currentIdx - 1] : projectKeys[projectKeys.length - 1];
}

document.getElementById('next').addEventListener('click', () => {
    const currentImages = projects[currentProject];
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
    } else {
        currentProject = getNextProject(currentProject);
        currentIndex = 0; 
    }
    updateImageDisplay();
});

function getNextProject(current) {
    const projectKeys = Object.keys(projects);
    const currentIdx = projectKeys.indexOf(current);
    return currentIdx < projectKeys.length - 1 ? projectKeys[currentIdx + 1] : projectKeys[0];
}

function changeImage(project) {
    currentProject = project;
    currentIndex = 0;
    updateImageDisplay();

    const buttons = document.querySelectorAll('#projectbuttons button');
    buttons.forEach(button => {
        button.classList.remove('active');

        if (button.getAttribute('onclick').includes(`'${project}'`)) {
            button.classList.add('active');
        }
    });
}


document.getElementById('download').addEventListener('click', function() {
    const url = 'Download/Portfolio_MinjungPark.pdf'; 
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Portfolio_MinjungPark.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});


let zoomEnabled = false; 

document.getElementById('toggle-zoom').addEventListener('click', function() {
    zoomEnabled = !zoomEnabled;  
    document.getElementById('zoom-icon').src = zoomEnabled ? 'Icons/zoomout.png' : 'Icons/zoomin.png';  
    document.getElementById('main-image').style.cursor = zoomEnabled ? 'zoom-in' : 'default'; 
});

document.getElementById('main-image').addEventListener('mousemove', function(event) {

    if (!zoomEnabled) {
        return; 
    }

    const zoomBox = document.getElementById('zoom-box');
    const bounds = this.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    zoomBox.style.display = 'block';
    zoomBox.style.width = '550px';
    zoomBox.style.height = '200px';

    let boxPosX = event.clientX + 20;
    let boxPosY = event.clientY + 20;

    if (boxPosX + 200 > window.innerWidth) {
        boxPosX -= 240; 
    }
    if (boxPosY + 200 > window.innerHeight) {
        boxPosY -= 240; 
    }

    zoomBox.style.left = `${boxPosX}px`;
    zoomBox.style.top = `${boxPosY}px`;

    const zoomLevel = 0.5;
    const bgImgWidth = this.naturalWidth;
    const bgImgHeight = this.naturalHeight;
    const bgX = (x / bounds.width) * bgImgWidth;
    const bgY = (y / bounds.height) * bgImgHeight;

    zoomBox.style.backgroundImage = `url(${this.src})`;
    zoomBox.style.backgroundRepeat = 'no-repeat';
    zoomBox.style.backgroundSize = `${bgImgWidth * zoomLevel}px ${bgImgHeight * zoomLevel}px`;
    zoomBox.style.backgroundPosition = `-${bgX * zoomLevel - 100}px -${bgY * zoomLevel - 100}px`;
});

document.getElementById('main-image').addEventListener('mouseleave', function() {
    document.getElementById('zoom-box').style.display = 'none'; 
});
