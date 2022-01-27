from flask import Flask, render_template, request, Response
import random

roll = 4

app = Flask (__name__)

def draw_svg_circle( cx, cy, r ):
    context = { 'cx':cx, 'cy':cy, 'r':r}
    dice_svg = render_template('no-dice.svg', **context)
    return dice_svg

@app.route('/', methods=('GET', 'POST'))
def home():
  global roll
  resp =""
  if request.method == "GET":
    # dice in the right
    resp = Response(render_template('svg.html', svg = draw_svg_circle(138, 183, 9)))
  elif request.method == "POST":
    # dice in the left
    dice_size = 6
    # no consecutive repeat
    adderRandom = random.randint(0,dice_size - 2)
    roll = (roll + adderRandom + 1) % (dice_size)
    # resp = Response(draw_svg_circle(39, 165, 9))
    resp = Response(str(roll))
  resp.headers['Access-Control-Allow-Origin'] = '*'
  resp.headers['Cache-Control'] = 'no-cache'
  resp.headers['X-Content-Type-Options'] = 'nosniff'

  return resp


def circle( cx, cy, r ):
    svg = '<svg width="100" height="100">{0}</svg>'
    circ = '<circle cx="{0}" cy="{1}" r="{2}" stroke="red"/>'
    circ = circ.format( cx, cy, r )
    svg = svg.format( circ )
    return svg
 
# @app.route('/test.svg', methods=('GET', 'POST'))
def form():
    if request.method == 'POST':
        cx = request.form['cx']
        cy = request.form['cy']
        r  = request.form['r']
        svg = circle( cx, cy, r )
        context = { 'cx':cx, 'cy':cy, 'r':r, 'svg':svg }
        return render_template( 'submit.html', **context )
    elif request.method == 'GET':
        return render_template( 'submit.html' )

if __name__== "__main__":
  # main()
  app.run(host='0.0.0.0',port=5000)