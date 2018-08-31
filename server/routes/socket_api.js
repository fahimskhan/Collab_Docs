import models from '../models/models';

const Document = models.Document;

export default function document(socket) {
  //fetching all docs
  socket.on('getAllDocs', (data, next) => {
    Document.find({ author: data.author}, (err, docs) => {
      console.log('found', docs);
      next(docs);
    })
  });

  //making a new doc
  socket.on('createDoc', (data, next) => {
    const newDoc = new Document ({
      name: data.name,
      content: data.content,
      author: data.author,
    });
    newDoc.save((err, doc) => next({err, doc}))
  });

  //editing the selected doc
  socket.on('editDoc', (data, next) => {
    Document.findById( data.id, (err, doc) => {
      next(doc);
    });
  });

  // saving the doc
  socket.on('saveDoc', (data, next) => {
    console.log('###THIS### ', data.content);
    Document.findByIdAndUpdate(data.id, {content: data.content}, (err) => {
      next(err);
    });
  });

  //deleting the selected doc
  socket.on('deleteDoc', (data, next) => {
    Document.deleteOne({
      _id: data.id
    }, (err) => next({err}))
  });

}
