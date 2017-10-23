import Sequelize from 'sequelize';
import db from './_db';
const User = db.model('user');

const Message = db.define('message', {
  subject: {
    type: Sequelize.STRING,
    defaultValue: 'No Subject'
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Message.getAllWhereSender = (senderId) => {
  return Message.findAll({
    where: {
      fromId: senderId
    },
    include: [
      { model: User, as: 'to' },
      { model: User, as: 'from' }
    ]
  });
};

Message.prototype.truncateSubject = function (subjectLen, addEpllipses) {
  const truncSubject = this.subject.slice(0, subjectLen);
  return {
    subject: addEpllipses ?
      truncSubject + '...' :
      truncSubject,
    body: this.body
  }
}

export default Message;
