document.addEventListener('DOMContentLoaded' ,  () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame()
    {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gametimerId = setInterval(startGame, 20)

    function control(e)
    {
        if (e.keyCode === 32){
            jump()
        }
    }

    function jump(){
        if (birdBottom < 500) 
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup' , control)

    function generateObstacle(){
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle =  document.createElement('div')
        const topobstacle =  document.createElement('div')
        if(!isGameOver) {
            obstacle.classList.add('obstacle')
            topobstacle.classList.add('topobstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topobstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topobstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topobstacle.style.bottom = obstacleBottom + gap + 'px'


        function moveObstacle()
        {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topobstacle.style.left = obstacleLeft + 'px'

            if(obstacleLeft === -60)
            {
            clearInterval(timerId)
            gameDisplay.removeChild(obstacle)
            gameDisplay.removeChild(topobstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom  + 153 || birdBottom > obstacleBottom  + gap -200) || birdBottom === 0)
            {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle , 20)
        if (!isGameOver) setTimeout(generateObstacle , 3000)
    }

    generateObstacle()

    function gameOver()
    {
        clearInterval(gametimerId)
        isGameOver = true
        document.removeEventListener('keyup' ,  control)
    }
})

