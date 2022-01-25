from flask import Flask
import random

app = Flask (__name__)

@app.route('/')
def home():
  return '<p> Hello world! </p>'

def main():
  dice_sum = 0
  # dice_rolls = int(input('How many dice would you like to roll?'))
  dice_rolls =3
  # dice_size = int(input('How many sides are the dice?'))
  dice_size = 6
  for i in range(0,dice_rolls):
    roll = random.randint(1,dice_size)
    dice_sum = dice_sum + roll
    if roll == 1:
      print(f'You rolled a {roll}! Critical fail!')
    elif roll == dice_size:
      print(f'You rolled a {roll}! Critical success!')
    else:
      print(f'You rolled a {roll}')

  print(f'You have rolled in total of {dice_sum}')

if __name__== "__main__":
  main()
  app.run(host='0.0.0.0',port=5000)