let totalDonated = 0;

const goals = [
  {
    amount: 25,
    icon: 'build',
  },
  {
    amount: 50,
    icon: 'business_center',
  },
  {
    amount: 75,
    icon: 'payments',
  },
  {
    amount: 100,
    icon: 'phone_iphone',
  }
]

function updateProgressBar(donated) {
    // Update the total donated amount
    totalDonated += donated;

    if (totalDonated > 100) {
      totalDonated = 100;
      document.getElementById('donateButton').classList.add('disabled');
      document.getElementById('donateButton').textContent = 'Thanks!';
    }

    const progressBar = document.getElementById('progressBar');
    const checkpoints = document.querySelectorAll('.checkpoint');
    const rewardConainers = document.querySelectorAll('.rewardContainer');
    const rewards = document.querySelectorAll('.reward');
  
    // Get total width and calculate percentage
    const maxWidth = progressBar.parentNode.offsetWidth;
    // Max width should be total amount
    const width = (totalDonated / 100) * maxWidth;

    // Update the width of the progress bar
    progressBar.style.width = width + 'px';
    
    // Update checkpoints
    checkpoints.forEach((checkpoint, index) => {
      const value = parseInt(checkpoint.getAttribute('data-value'), 10);
      if (totalDonated >= value) {
        checkpoint.classList.add('active');
        rewardConainers[index].classList.add('active');
        rewards[index].classList.add('active');
      } else {
        checkpoint.classList.remove('active');
      }
    });
  }

function donate() {
  // Get random number between 1 and 10
  const donationAmount = Math.floor(Math.random() * 10) + 1;
  updateProgressBar(donationAmount);
}

document.addEventListener('DOMContentLoaded', function () {
  const rewardsContainer = document.querySelector('#rewardsContainer');
  const checkPointsContainer = document.querySelector('#checkPointsContainer');
  goals.forEach((goal) => {
    const rewardContainer = document.createElement('div');
    rewardContainer.classList.add('rewardContainer');
    const reward = document.createElement('i');
    reward.classList.add('material-icons', 'reward');
    rewardContainer.appendChild(reward);
    rewardsContainer.appendChild(rewardContainer);
    reward.textContent = goal.icon;

    // Add checkpoints
    const checkpoint = document.createElement('div');
    checkpoint.classList.add('checkpoint');
    checkpoint.setAttribute('data-value', goal.amount);
    checkPointsContainer.appendChild(checkpoint);
  });
});
