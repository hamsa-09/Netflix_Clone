import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        favMovies: [{ type: String }],
    },
    { timestamps: true }
);
//pre-save middleware
userSchema.pre('save', async function (next) {
    //if password is not modified ,skip  hashing
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.matchPassword = async function (newPassword){
    return await bcrypt.compare(newPassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
