from flask import Flask,request, url_for, redirect, render_template
import pickle
import numpy as np

app = Flask(__name__)

model=pickle.load(open('model.pkl','rb'))


@app.route('/')
def hello_world():
    return render_template("views/index.ejs")


@app.route('/saveform',methods=['POST','GET'])
def saveform():
    int_features=[int(x) for x in request.form.values()]
    final=[np.array(int_features)]
    print(int_features)
    print(final)
    prediction=model.fit_predict(final)
     return render_template('views/index.ejs',pred='Your are in group {}'.format(output))   
if __name__ == '__main__':
    app.run(debug=True)
