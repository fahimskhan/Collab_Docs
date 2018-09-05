import models from '../models/models';

const Document = models.Document;

export default function document(socket) {
  //fetching my docs
  socket.on('getMyDocs', (data, next) => {
    Document.find({author: data.author}, (err, docs) => {
      next(docs);
    });
  });

  //fetching shared docs
  socket.on('getSharedDocs', (data, next) => {
    Document.find({collaborators: {$in: data.collaborator}}, (err, docs) => {
      next(docs);
    });
  });

  //making a new doc
  socket.on('createDoc', (data, next) => {
    const newDoc = new Document ({
      name: data.name,
      content: data.content,
      author: data.author,
      collaborators: [],
    });
    newDoc.save((err, doc) => {
      next({err, doc});
    });
  });

  //accessing a shared doc
  socket.on('accessDoc', (data, next) => {
    Document.findById(data.id, (err, doc) => {
      if (err) return next({err, doc})
      if (doc.author !== data.collaborator) {
        doc.collaborators.push(data.collaborator);
        doc.save((err) => {
          next({err, doc});
        });
      } else {
        next(doc);
      }
    });
  });

  //editing the selected doc
  socket.on('editDoc', (data, next) => {
    Document.findById( data.id, (err, doc) => {
      socket.join(doc._id);
      next(doc);
    });
  });

  // saving the selected doc when change is made to the doc
  socket.on('onChange', (data, next) => {
    Document.findByIdAndUpdate(data.id, {content: data.content}, (err, doc) => {
      console.log("@@@", doc)
      socket.emit('updateAll', doc);
      //next(err);
    });
  });

  // saving the selected doc when save button is pressed
  socket.on('saveDoc', (data, next) => {
    Document.findByIdAndUpdate(data.id, {content: data.content}, (err) => {
      next(err);
    });
  });

  //deleting the selected doc
  socket.on('deleteDoc', (data, next) => {
    Document.deleteOne({_id: data.id}, (err) => {
      next(err);
    });
  });

  //removing the selected shared doc
  socket.on('removeDoc', (data, next) => {
    Document.findById(data.id, (err, doc) => {
      if (err) return next({err, doc})
      doc.collaborators = doc.collaborators.filter((collaborator) => {if (collaborator !== data.collaborator) {return collaborator}});
      doc.save((err) => {
        next({err, doc});
      });
    });
  });

}
