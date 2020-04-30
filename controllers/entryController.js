const Entry = require('../models/Entry');


exports.addEntry = async (req,res) => {
    try{
        await (new Entry(req.body)).save();
        req.flash('success','Added!');
        res.redirect('/');

    } catch(err){
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => req.flash('error', err.errors[key].message));
        res.redirect('back');
    }

}

exports.displayEntries = async (req,res) => {

    try{
        const entries = await Entry.find();
        console.log(entries);
        res.render('index', {title: 'Bullet Journal App', entries});


    } catch(err){
        console.log(`ERROR! ${err}`);
    }

}

exports.editEntry = async (req,res) => {

    try {
        const entryId = req.params.id;
        const entries = await Entry.find();
        const entry = await Entry.findById(entryId);

        res.render('index', {title:'Bullet Journal',entries,entry});

    } catch(err){
        console.log(`ERROR! ${err}`);
    }
}

exports.deleteEntry = async (req,res) => {

    try{
        
        const query = {_id:req.params.id};
        await Entry.deleteOne(query);
        res.redirect('/');

    } catch(err){
        console.log(`ERROR! ${err}`);
    }
}

exports.updateEntry = async (req,res) => {
    try{
        await Entry.findOneAndUpdate({_id:req.params.id},req.body,{
            new: true, 
            runValidators: true,
        }).exec();
        req.flash('success','Updated!');
        res.redirect('/');


    } catch(err){
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => req.flash('error', err.errors[key].message));
        res.redirect('back');
    }
}

exports.toggleTaskStatus = async (req,res) => {
    try{
        const task = await Entry.findById({_id:req.params.id});
        
        const taskStatus = !task.complete;

        await Entry.update({_id:req.params.id},
            { $set: {complete: taskStatus}},
            {new: true}
            );

        res.redirect('/');
        

    } catch(err){
        console.log(err);
        res.redirect('back');
    }
}