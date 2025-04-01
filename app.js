document.addEventListener('DOMContentLoaded', () => {
    const choices = ['snake', 'water', 'gun'];
    const choiceEmojis = {
        'snake': '🐍',
        'water': '💧',
        'gun': '🔫'
    };
    
    let userScore = 0;
    let computerScore = 0;
    
    const userScoreDisplay = document.getElementById('user-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resultFlash = document.getElementById('result-flash');
    const resultText = document.getElementById('result-text');
    const userChoiceDisplay = document.getElementById('user-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const resetButton = document.getElementById('reset-btn');
    const fullscreenFlash = document.getElementById('fullscreen-flash');
    const flashText = document.getElementById('flash-text');
    const loading = document.getElementById('loading');
    
    const getComputerChoice = () => {
        return choices[Math.floor(Math.random() * choices.length)];
    };
    
    const determineWinner = (userChoice, computerChoice) => {
        if (userChoice === computerChoice) return 'draw';
        if (
            (userChoice === 'snake' && computerChoice === 'water') ||
            (userChoice === 'water' && computerChoice === 'gun') ||
            (userChoice === 'gun' && computerChoice === 'snake')
        ) {
            return 'user';
        }
        return 'computer';
    };
    
    const showFlashMessage = (message) => {
        flashText.textContent = message;
        fullscreenFlash.style.opacity = '1';
        setTimeout(() => {
            fullscreenFlash.style.opacity = '0';
        }, 500);
    };
    
    const updateChoicesAndShowResult = (userChoice, computerChoice, winner) => {
        // First show both choices
        userChoiceDisplay.textContent = choiceEmojis[userChoice];
        computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
        
        // Wait 1 second before showing the result
        setTimeout(() => {
            if (winner === 'user') {
                userScore++;
                userScoreDisplay.textContent = userScore;
                showFlashMessage('YOU WIN! 🏆');
            } else if (winner === 'computer') {
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
                showFlashMessage('COMPUTER WINS! 💻');
            } else {
                showFlashMessage("IT'S A DRAW! 🤝");
            }
        }, 1000);
    };
    
    const showLoading = () => {
        loading.style.display = 'block';
        choiceButtons.forEach(btn => btn.classList.add('disabled'));
    };
    
    const hideLoading = () => {
        loading.style.display = 'none';
        choiceButtons.forEach(btn => btn.classList.remove('disabled'));
    };
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.id;
            showLoading();
            computerChoiceDisplay.textContent = '🤔';
            
            // First delay - Computer thinking
            setTimeout(() => {
                hideLoading();
                const computerChoice = getComputerChoice();
                const winner = determineWinner(userChoice, computerChoice);
                updateChoicesAndShowResult(userChoice, computerChoice, winner);
            }, 500);
        });
    });
    
    resetButton.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        userScoreDisplay.textContent = '0';
        computerScoreDisplay.textContent = '0';
        userChoiceDisplay.textContent = '❓';
        computerChoiceDisplay.textContent = '❓';
        resultText.textContent = 'MAKE YOUR MOVE!';
    });
});
