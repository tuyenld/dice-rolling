import random

def main():
  dice_sum = 0
  dice_rolls = 2
  for i in range(0,dice_rolls):
    roll = random.randint(1,6)
    print(f'You rolled a {roll}')
    dice_sum = dice_sum + roll
  print(f'You have rolled in total of {dice_sum}')

if __name__== "__main__":
  main()